import { useState } from "react";
import css from "./Searchbar.module.css"
import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const Searchbar =({onSubmit})=>  {
  const [value, setValue] = useState('')


const handleChange = event => {
  setValue(event.target.value.toLowerCase().trim())
  };

  const handleSubmit = (event)=> {
event.preventDefault()
if (value.trim() === '') {
  toast.error("Please, write search name")
  return
  }
onSubmit(value)
console.log(value)
setValue('')
}


    return (
      <header className={css.searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit} >
          <button type="submit" className={css.SearchFormButton}>
            <span className={css.SearchFormButtonlabel}>Search</span>
          </button>
  
          <input
          name="input"
          value={value}
          onChange={handleChange}
            className={css.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  

  }


