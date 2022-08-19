import AddEditProductForm from 'components/product/AddEditProductForm'
import { useParams } from 'react-router-dom'

const EditProduct = () => {
  const { id: productId } = useParams()

  return (
    <div className="card">
      <div className="card-header">ویرایش محصول {productId}</div>
      <div className="card-body">
        <AddEditProductForm productId={productId} mode={"edit"} />
      </div>
    </div>
  )
}

export default EditProduct
