import React from 'react'
import AddEditProductForm from 'components/product/AddEditProductForm'

const AddProduct = () => {

  return (
    <>
      <div className="card">
        <div className="card-header">افزودن محصول</div>
        <div className="card-body">
          <AddEditProductForm  mode={"add"} />
        </div>
      </div>
    </>
  )
}

export default AddProduct
