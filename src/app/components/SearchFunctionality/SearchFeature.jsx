"use client"
import React, { useEffect, useState } from 'react'
import BasicTextFields from './TextSearch'
import axios from 'axios';


const SearchFeature = () => {


  return (
    <div>
      <BasicTextFields label="Search blogs" />
    </div>
  )
}

export default SearchFeature
