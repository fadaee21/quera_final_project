import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import { editProductAPI, getOneProductsAPI } from 'services/api'
import { postOneProductsAPI } from 'services/api'

const AddEditProductForm = ({ productId, mode }) => {

  const history = useHistory()
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()


  useEffect(() => {
    if (mode === "edit") {
      getOneProductsAPI(productId).then(res => {
        setValue('name', res.data.name)
        setValue('price', res.data.price)
        setValue('category', res.data.category)
        setValue('description', res.data.description)
      })
    }
  }, [mode, productId, setValue])

  return (
    <form onSubmit={handleSubmit(data => {
      if (mode === "add") {
        postOneProductsAPI(data);
        history.push('/')
      }
      if (mode === "edit") {
        editProductAPI(productId, data)
        history.push('/all-products')
      }
      reset()
    })}>
      <div className="row">
        <div className="col-md-6">
          <label htmlFor="nameInput" className="form-label">
            عنوان
          </label>
          <input
            type="text"
            className={`form-control${errors.name ? ' is-invalid' : ''}`}
            id="nameInput"
            placeholder="گوشی‌ موبایل"
            {...register('name', { required: true })}
          />
          {errors.name && (
            <div className="invalid-feedback">وارد کردن عنوان اجباری است.</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="priceInput" className="form-label">
            قیمت
          </label>
          <input
            type="number"
            className={`form-control${errors.price ? ' is-invalid' : ''}`}
            id="priceInput"
            placeholder="1000"
            {...register('price', { required: true })}
          />
          {errors.price && (
            <div className="invalid-feedback">وارد کردن قیمت اجباری است.</div>
          )}
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-6">
          <label htmlFor="stockInput" className="form-label">
            موجودی
          </label>
          <input
            type="number"
            className={`form-control${errors.stock ? ' is-invalid' : ''}`}
            id="stockInput"
            placeholder="10"
            {...register('stock', { required: true })}
          />
          {errors.stock && (
            <div className="invalid-feedback">وارد کردن موجودی اجباری است.</div>
          )}
        </div>
        <div className="col-md-6">
          <label htmlFor="categorySelect" className="form-label">
            دسته‌بندی
          </label>
          <select
            className="form-select"
            id="categorySelect"
            {...register('category', { required: true })}
          >
            <option value="mobile">موبایل</option>
            <option value="book">کتاب</option>
            <option value="tshirt">تیشرت</option>
          </select>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col-md-12">
          <label htmlFor="descriptionTextarea" className="form-label">
            توضیحات
          </label>
          <textarea
            className={`form-control${errors.description ? ' is-invalid' : ''}`}
            id="descriptionTextarea"
            rows="3"
            {...register('description', {})}

          />
          {errors.description && (
            <div className="invalid-feedback">وارد کردن موجودی اجباری است.</div>
          )}
        </div>
      </div>
      <button type="submit" className={`btn btn-${mode === "add" ? "primary" : "success"} mt-4 float-start`}>
        {mode === "edit" ? "ویرایش محصول" : " افزودن محصول"}

      </button>
    </form>
  )
}

export default AddEditProductForm
