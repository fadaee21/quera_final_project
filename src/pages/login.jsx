import { useAuth } from 'contexts/Auth'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { createUserAPI, loginUserAPI } from 'services/api'

const ERROR_MESSAGES = {
  'Missing password': 'گذرواژه خالی می‌باشد!',
  'Missing email': 'ایمیل خالی می‌باشد!',
  'user not found': 'کاربری با این مشخصات یافت نشد!',
  'wrong password': 'پسورد اشتباه است',
  'week': 'چه پسورد ضعیفی',
  'exist': 'این ایمیل قبلا ایجاد شده است'
}

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [startValidation, setStartValidation] = useState(false)

  const onEmailInputChange = (event) => setEmail(event.target.value)
  const onPasswordInputChange = (event) => setPassword(event.target.value)

  const { toggleAuth, user } = useAuth()
  const history = useHistory()

  const loginAPI = ({ email, password }) => {
    //start validation if true then show error box
   
   
    loginUserAPI()
      // see the password is correct or not for logging
      .then((res) => {
        const checkPassword = res.data.filter(i => i.email === email).map(i => i.password === password)[0]
        console.log((checkPassword))
        if (checkPassword) {
          // Change user login state on success login
          toggleAuth()
          // Redirect user to /dashboard
          history.push('/dashboard')
          alert("welcome")
        } else {
          setEmailErr(ERROR_MESSAGES['wrong password'])
          setStartValidation(true)
        }
      })
      .catch((err) => setEmailErr(() => err.response))
  }

  const handleLogin = (event) => {
    event.preventDefault()
    loginAPI({ email, password })
    console.log('logging to account')
  }

  // check database the email is exist  or not before creating new account
  useEffect(() => {
    loginUserAPI()
      .then((res) => {
        const duplicateEmail = res.data.filter(i => i.email === email)[0].email
        console.log(duplicateEmail)
        duplicateEmail
          ? setEmailErr(ERROR_MESSAGES['exist'])
          : setEmailErr("")
      })
      .catch((err) => console.log(err.response))
  }, [email])

  //check password strangeness
  useEffect(() => {
    const passwordValidation = /^[a-z0-9]\w{6,}$/.test(password)
    passwordValidation
      ? setPasswordErr("")
      : setPasswordErr(ERROR_MESSAGES['week'])
  }, [password])

  const handleCreate = (event) => {
    event.preventDefault()
    setStartValidation(true)
    if (!emailErr && !passwordErr) {
      createUserAPI({ email, password })
        .then(() => {
          // Change user login state on success login
          toggleAuth()
          history.push('/dashboard')
        })
        .catch((err) => console.log(err.response))
    }
  }

  // Check if user already logedin, redirect to dashboard
  useEffect(() => {
    if (user.loggedIn) {
      history.push('/dashboard')
    }// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])


  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-4">
          {(emailErr && startValidation) && (
            <div className="alert alert-danger" role="alert">
              {ERROR_MESSAGES[emailErr] ?? emailErr}
            </div>)}
          {(passwordErr && startValidation) && (<div className="alert alert-danger" role="alert">
            {ERROR_MESSAGES[passwordErr] ?? passwordErr}
          </div>
          )}
          <div className="card">
            <form className="card-body" onSubmit={handleLogin}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  ایمیل
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  onChange={onEmailInputChange}
                  className="form-control"
                  aria-describedby="emailHelp"
                  value={email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  گذرواژه
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  onChange={onPasswordInputChange}
                  className="form-control"
                  value={password}
                />
              </div>
              <button disabled={!email || !password} type="submit" className="btn btn-primary m-1">
                ورود به حساب
              </button>

              <button disabled={!email || !password} onClick={handleCreate} className="btn btn-success m-1">
                ایجاد حساب
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
