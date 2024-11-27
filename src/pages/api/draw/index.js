import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      takerId: null,
      takerName: null
    })
  }

  const { giver } = req.body

  if (!giver) {
    return res.status(400).json({ 
      error: 'Giver ID is required',
      takerId: null,
      takerName: null
    })
  }

  try {
    // Check if giver already exists in draw table
    const { data: existingGiver, error: giverError } = await supabase
      .from('draw')
      .select('*')
      .eq('giver', giver)
      .single()

    if (existingGiver) {
      const takerId = existingGiver.taker;

      const {data: takerDetails, error: takerError } = await supabase
      .from('user')
      .select('*')
      .eq('id', takerId)
      .single()

      if (takerError) throw takerError;

      const takerName = takerDetails.name

      return res.status(400).json({ 
        error: 'You have already drawn your taker',
        takerId: existingGiver.taker,
        takerName: takerName,
      })
    }

    const { data: existingDraws, error: drawError } = await supabase
      .from('draw')
      .select('taker')

    if (drawError) throw drawError

    // Create a set of existing taker IDs for faster lookup
    const existingTakerIds = new Set(existingDraws.map(draw => draw.taker))

    // Get all eligible users (not already takers, not the giver, and not the person who gave to our giver)
    const { data: eligibleUsers, error: userError } = await supabase
      .from('user')
      .select('id, name')
      .not('id', 'in', `(${Array.from(existingTakerIds).join(',')})`)
      .neq('id', giver)
    
    if (userError) throw userError

    if (!eligibleUsers?.length) {
      // If no eligible users left, get giver's details to assign themselves
      const { data: giverUser, error: giverDetailsError } = await supabase
        .from('user')
        .select('id, name')
        .eq('id', giver)
        .single()

      if (giverDetailsError) throw giverDetailsError

      // Assign giver as their own taker
      const { error: insertError } = await supabase
        .from('draw')
        .insert({ giver, taker: giver })

      if (insertError) throw insertError

      return res.status(200).json({ 
        message: 'Draw completed with giver as taker (no other eligible takers available)',
        takerId: giverUser.id,
        takerName: giverUser.name
      })
    }

    // Randomly select a taker from eligible users
    const randomTaker = eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)]

    // Insert new draw into database
    const { error: insertError } = await supabase
      .from('draw')
      .insert({ giver, taker: randomTaker.id })

    if (insertError) throw insertError

    return res.status(200).json({ 
      message: 'Secret Santa draw completed successfully',
      takerId: randomTaker.id,
      takerName: randomTaker.name
    })

  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ 
      error: 'Failed to complete Secret Santa draw',
      takerId: null,
      takerName: null
    })
  }
}
