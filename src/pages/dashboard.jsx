import { useEffect, useState } from 'react'
import axios from 'axios'
import DashboardWidget from 'components/dashboard/DashboardWidget'
import EmployeesChart from 'components/dashboard/EmployeesChart'
import Chart from '../components/dashboard/Chart'


const Dashboard = () => {
  const [productsCount, setProductsCount] = useState(0)
  const [totalIcomes, setTotalIncomes] = useState(0)
  const [successfulOrdersCount, setSuccessfulOrdersCount] = useState(0)

  const getProducts = () => {
    axios.get('http://localhost:8000/products').then((res) => {
      const products = res.data
      setProductsCount(products.length)
    })
  }

  const getOrders = () => {
    axios.get('http://localhost:8000/orders').then((res) => {
      const orders = res.data
      const incomes = orders
        .filter((order) => order.status === 1)
        .reduce((total, order) => total + order.price, 0)
      setTotalIncomes(incomes)
      setSuccessfulOrdersCount(
        orders.filter((order) => order.status === 1).length,
      )
    })
  }

  useEffect(() => {
    getProducts()
    getOrders()
  }, [])



  return (
    <>
      <div className="row">
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد محصولات"
            icon="tshirt"
            value={productsCount}
            color="bg-primary"
            testId="products-count"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="درآمد کل"
            icon="coins"
            value={totalIcomes + ' تومان'}
            color="bg-warning"
            testId="total-incomes"
          />
        </div>
        <div className="col-12 col-sm-6 col-lg-4">
          <DashboardWidget
            title="تعداد سفارشات موفق"
            icon="shopping-cart"
            value={successfulOrdersCount}
            color="bg-danger"
            testId="successful-orders-count"
          />
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-md-12">
          <h5>employee chart</h5>
          <EmployeesChart />
        </div>
        <div className="col-md-12">
          <h5>chart</h5>
          <Chart />
        </div>
      </div>
    </>
  )
}

export default Dashboard
