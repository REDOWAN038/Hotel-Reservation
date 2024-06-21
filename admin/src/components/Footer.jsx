const Footer = () => {
    return (
        <div className='bg-[#003580] py-10'>
            <div className='container mx-auto flex flex-col lg:flex-row justify-between items-center'>
                <span className='text-xl md:text-2xl text-white font-bold tracking-tight'>
                    CholoGhurteJai.com
                </span>
                <span className='text-white font-bold tracking-tight flex gap-4'>
                    <p className='cursor-pointer'>Privacy Policy</p>
                    <p className='cursor-pointer'>Terms of Service</p>
                </span>
            </div>
        </div>
    )
}

export default Footer
