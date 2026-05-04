const product = [
    {name:"Wireless Headphones", img:"https://via.placeholder.com/80", price:"7999", desc:"Noise-cancelling over-ear headphones"},
    {name:"Smartwatch", img:"https://via.placeholder.com/80", price:"12999", desc:"Fitness tracking smartwatch"},
    {name:"Gaming Mouse", img:"https://via.placeholder.com/80", price:"2499", desc:"Ergonomic gaming mouse"},
    {name:"Laptop Stand", img:"https://via.placeholder.com/80", price:"1999", desc:"Adjustable aluminium stand"},
    {name:"Keyboard", img:"https://via.placeholder.com/80", price:"1499", desc:"Mechanical keyboard"},
    {name:"Monitor", img:"https://via.placeholder.com/80", price:"9999", desc:"Full HD display"},
    {name:"USB Hub", img:"https://via.placeholder.com/80", price:"799", desc:"Multi-port USB hub"},
    {name:"Webcam", img:"https://via.placeholder.com/80", price:"2999", desc:"HD webcam"},
    {name:"Speakers", img:"https://via.placeholder.com/80", price:"3999", desc:"Stereo speakers"},
    {name:"Power Bank", img:"https://via.placeholder.com/80", price:"1999", desc:"Fast charging power bank"},
    {name:"Router", img:"https://via.placeholder.com/80", price:"3499", desc:"WiFi router"},
    {name:"Tablet", img:"https://via.placeholder.com/80", price:"15999", desc:"Android tablet"}
  ];

const rowonpage = 5;
let currpage = 1;
function displyproduct(){
    const table = document.getElementById("producttable");
    table.innerHTML= "";

    const start = (currpage-1)*rowonpage;
    const end = start+rowonpage;

    const pageproduct = product.slice(start,end);

    pageproduct.forEach(p=> {
        table.innerHTML += `
        <tr>
          <td>${p.name}</td>
          <td><img src="${p.img}"></td>
          <td>₹${p.price}</td>
          <td>${p.desc}</td>
        </tr>
        `;
    });

}

function previous(){
    if(currpage>1){
        currpage--;
        displyproduct();
    }
}
function next(){
    if(currpage< Math.ceil(product.length/rowonpage)){
        currpage++;
        displyproduct();
    }
}
displyproduct();