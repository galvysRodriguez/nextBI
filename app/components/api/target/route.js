export const server = 'http://localhost:8000'

export async function GET({endpoint}) {
    try {
      const response = await fetch(`${server}/targets/${endpoint}`)
      if (!response.ok) throw new Error("Error fetching data")
  
      const data = await response.json()
      return Response.json(data)
    } catch (error) {
      return Response.json({ message: "Error retrieving targets", status: false, data: [], error: error.message }, { status: 500 });
    }
  }
  