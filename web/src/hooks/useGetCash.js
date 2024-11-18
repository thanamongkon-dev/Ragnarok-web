import axios from 'axios'
import React from 'react'

const useGetCash = () => {
    async function getCash(accountId) {
        try {
            const response = await axios.get(`http://localhost/api/getCash.php?accountId=${accountId}`)
            return response.data
        } catch (error) {
            // Handle error
            console.error(error)
        }
    }
  return {getCash}

}

export default useGetCash