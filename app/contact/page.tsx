'use client'
import React, { useState } from 'react';

export default function page() {
	async function handleSubmit(event: any) {
    event.preventDefault();
    const formData = new FormData(event.target);

    formData.append("access_key",String(process.env.SECRET));

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
    }
	event.name="";
	event.email="";
	event.message="";
  }

  return (
    <section className='w-[100vw] lg:h-[92vh] h-[75vh] flex flex-col gap-3 justify-center items-center'>
        <h1 className='text-center font-semibold text-4xl overflow-hidden'>Got Questions?</h1>
        <p className='text-center'>Lets Talk! fill the form below or email us with your query.</p>
        <form action="" onSubmit={handleSubmit} className='lg:w-[50%] w-[75%] drop-shadow-lg bg-neutral-200 flex flex-col gap-3 p-3 rounded-md'>
            <input name="name" type="text" placeholder="Enter Your Name..."  className="px-3 py-2 rounded-md border-[2px] border-neutral-300"/>
            <input name="email" type="email" placeholder="Enter Your Email..."  className="px-3 py-2 rounded-md border-[2px] border-neutral-300"/>
            <textarea name="message" className="px-3 py-2 rounded-md border-[2px] border-neutral-300" placeholder='Enter Your Message Here...' id="" cols={30} rows={10}></textarea>
            <button className='bg-neutral-600 text-white hover:scale-95 transition-all duration-400 py-2 px-5 rounded-md mx-auto self-start' type='submit'>Send Now</button>
        </form>
    </section>
  )
}
