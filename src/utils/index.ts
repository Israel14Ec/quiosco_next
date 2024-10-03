export function formatCurrency(amount:number) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount)
}

//Funcion para obtener la URl dinamicamente (algunas imagenes estan guardadas en cloudinary otras en public)
export function getImagePath(imagePath:string) {
    const cloudinaryBaseUrl = 'https://res.cloudinary.com'
    
    //Si la imagen comienza  con
    if(imagePath.startsWith(cloudinaryBaseUrl)) {
        return imagePath
    } else {
        return `/products/${imagePath}.jpg`
    }
}