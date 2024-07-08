const images = {
    1:require('./random/1.png'), 
    2:require('./random/2.png'),
    3:require('./random/3.png'),
    4:require('./random/4.png'),
    5:require('./random/5.png'),
    6:require('./random/6.png')
}

const randomImage = () => {
    let min = 1;
    let max = 2;
    let random = Math.floor(Math.random()*(max-min+1)) + min;
    return images[random];
}

export default randomImage