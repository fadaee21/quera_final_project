import { Loading } from '../index'
import React, { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'

const EmployeesChart = () => {
  const [employeesChart, setEmployeesChart] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const getDataForChart = () => {
    axios.get("https://dummy.restapiexample.com/api/v1/employees", {
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(({ data: { data } }) => {
        const labels = []
        const salary = []
        const age = []

        data.forEach((item) => {
          labels.push(item.employee_name)
          salary.push(item.employee_salary)
          age.push(item.employee_age)
          console.log(item)
        })

        setEmployeesChart({
          labels,
          datasets: [
            {
              label: 'Salary',
              lineTension: 0.2,
              data: salary,
              fill: false,
              backgroundColor: 'rgb(255, 99, 132)',
            },
            {
              label: 'Age',
              data: age,
              fill: age,
              backgroundColor: 'rgb(15, 99, 132)',
            },
          ],
        })
        setIsLoading(false)
      })
      .catch((err) => console.error({ err }))
  }


  useEffect(() => {
    getDataForChart()
  }, [])

  return isLoading ? <Loading /> : <Line data={employeesChart} />
}

export default EmployeesChart
