import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database 
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
)

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Returns all users from the database
 *     responses:
 *       200:
 *         description: Array of users
 *       500:
 *         description: Error message
 *   post:
 *     description: Creates a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 */
export default async function handler(req, res) {
  switch (req.method) {
    case 'GET':
      return getUsers(req, res)
    case 'POST':
      return createUser(req, res)
    default:
      return res.status(405).json({ message: 'Method not allowed' })
  }
}

async function getUsers(req, res) {
  try {
    const { data, error } = await supabase
      .from('user')
      .select('*')

    if (error) {
      throw error
    }

    return res.status(200).json(data)
  } catch (error) {
    console.error('Error fetching users:', error)
    return res.status(500).json({ error: 'Error fetching users' })
  }
}

async function createUser(req, res) {
  try {
    const { name, email } = req.body

    // Validate required fields
    if (!name || !email) {
      return res.status(400).json({ 
        error: 'Missing required fields. Name and email are required.' 
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        error: 'Invalid email format' 
      })
    }

    // Check if user with email already exists
    const { data: existingUser, error: searchError } = await supabase
      .from('user')
      .select('email')
      .eq('email', email)
      .single()

    if (searchError && searchError.code !== 'PGRST116') { // PGRST116 is the error code for no rows returned
      throw searchError
    }

    if (existingUser) {
      return res.status(409).json({ 
        error: 'User with this email already exists' 
      })
    }

    // Create new user if email doesn't exist
    const { data, error } = await supabase
      .from('user')
      .insert([{ name, email }])
      .select()

    if (error) {
      throw error
    }
    return res.status(201).json(data[0])
  } catch (error) {
    console.error('Error creating user:', error)
    return res.status(500).json({ 
      error: 'Error creating user',
      details: error.message 
    })
  }
}
