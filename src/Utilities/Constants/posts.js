export const mgs = ['/im1.png', '/im2.png', '/im3.png', '/im4.png', '/im5.png'];
export const details = [
  "5 web APIs that",// add mobile functionality to your project",
  "Building a random number generator with JavaScript and Node.js",
  "7 most common web design mistakes according to psychology",
  "1 week with GitHub Copilot: Building an app using only Copilot"
]

export const subDetails = [
  "Learn about APIs that ",//provide mobile-friendly functionality, such as the Web Share, Contact Picker, and Clipboard APIs.",
  "Improve the security of your Node.js apps with private keys or create useful gameplay features with this guide to.",
  "If you’re a frontend dev tasked with designing an app in addition to building it, these psychological principles can",
  "GitHub Copilot is the newest tool to autocomplete code with the help of OpenAI. Learn how to build an"
]

export  const fillMage=(ind, type=null)=>{
  switch (type) {
    case 0:
      return mgs[ind%5];
      break;
    case 1:
      return details[ind%4];
      break;      
    case 2:
      return subDetails[ind%4];
      break;
  
    default:
      return mgs[ind%5];
  }
}

export const POST =(i)=>{
  return{
    caption: `${mgs[i]}.png`,
    title: details[i],
    description: subDetails[i],
    date: new Date(),
    duration: Math.ceil(Math.random() * 10),
    content: JSON.stringify({}),
  }
}