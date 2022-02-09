const convertToMS = 100

export default function (min:number, max:number) { // min and max included 
    return (Math.floor(Math.random() * (max - min + 1) + min)) * convertToMS
}