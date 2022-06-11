import { useState, useEffect } from "react"
import { UserModel } from "../models/User"
import type { User } from "../types/user"

// Default way to use a logged user
// Feel free to update the user ID for your tests
// or enhance it with better data source, or better user management
export const getLoggedUserId = (): User["id"] => 1

export const useDetailsUser = (userId: number): [data: UserModel] => {
  const [data, setData] = useState<UserModel>(null)
  useEffect(
    function () {
      if (userId > 0) {
        const fetchData = async function () {
          const response = await fetch(
            `http://localhost:3005/users?id=${userId}`
          )
          const responseData = await response.json()
          if (response.ok) {
            let data = new UserModel(responseData[0])
            setData(data)
          }
        }
        fetchData().catch(console.error)
      }
    },
    [userId]
  )
  return [data]
}
