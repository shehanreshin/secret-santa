import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
)

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      error: 'Method not allowed',
      takerId: null,
      takerName: null
    })
  }

  const { giver } = req.query

  if (!giver) {
    return res.status(400).json({ 
      error: 'Giver ID is required',
      takerId: null,
      takerName: null
    })
  }

  try {
    // Get draw entry and join with users table to get taker's name
    const { data: draw, error } = await supabase
      .from('draw')
      .select(`
        taker,
        taker_details:user!draw_taker_fkey (
          name
        )
      `)
      .eq('giver', giver)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({
          error: 'No draw found for this giver',
          takerId: null,
          takerName: null
        })
      }
      throw error
    }

    return res.status(200).json({
      message: 'Taker details retrieved successfully', 
      takerId: draw.taker,
      takerName: draw.taker_details.name
    })

  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ 
      error: 'Failed to get taker details',
      takerId: null,
      takerName: null
    })
  }
}
