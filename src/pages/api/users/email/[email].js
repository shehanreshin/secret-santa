import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * @swagger
 * /api/users/email/{email}:
 *   get:
 *     description: Returns a user by their email address
 *     parameters:
 *       - in: path
 *         name: email
 *         required: true
 *         schema:
 *           type: string
 *         description: The user's email address
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 *       500:
 *         description: Error message
 */
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const { email } = req.query

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      })
    }

    const { data, error } = await supabase
      .from('user')
      .select('*')
      .eq('email', email)
      .single()

    if (error) {
      if (error.code === 'PGRST116') { // No rows returned
        return res.status(404).json({ error: 'User not found' })
      }
      throw error
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching user:', error)
    return res.status(500).json({ 
      error: 'Error fetching user',
      details: error.message 
    })
  }
}
