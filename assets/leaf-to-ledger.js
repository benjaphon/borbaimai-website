(() => {
  const relief=document.querySelector('.relief');
  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reduce.matches) {
    relief.classList.add('veins-ready');
    const io=new IntersectionObserver(entries=>{
      if(entries.some(e=>e.isIntersecting)){relief.classList.add('veins-seen');io.disconnect();}
    },{threshold:.22});
    io.observe(relief);
    reduce.addEventListener('change',event=>{if(event.matches){io.disconnect();relief.classList.remove('veins-ready');}},{once:true});
  }
  const ledger=document.querySelector('.ledger');
  const action=ledger.querySelector('.ledger-action');
  const math=ledger.querySelector('#ledger-calculation');
  const fmt=new Intl.NumberFormat('en-US');
  const orders=Array.from(ledger.querySelectorAll('tbody tr'),row=>({paid:row.dataset.paid==='true',baht:Number(row.dataset.baht)}));
  const paid=orders.filter(x=>x.paid), open=orders.filter(x=>!x.paid);
  const sum=xs=>xs.reduce((total,x)=>total+x.baht,0);
  ledger.querySelector('#ledger-total').textContent=fmt.format(sum(paid));
  ledger.querySelector('#ledger-paid').textContent=paid.length;
  ledger.querySelector('#ledger-open').textContent=open.length;
  ledger.querySelector('#ledger-outstanding').textContent=fmt.format(sum(open));
  math.textContent=paid.map(o=>fmt.format(o.baht)).join(' + ')+' = '+fmt.format(sum(paid))+' บาท';
  action.hidden=false;
  action.addEventListener('click',()=>{
    const expanded=action.getAttribute('aria-expanded')==='true';
    action.setAttribute('aria-expanded',String(!expanded));
    action.firstElementChild.textContent=expanded?'ดูวิธีคิดยอด':'ซ่อนวิธีคิดยอด';
    math.hidden=expanded;
    ledger.classList.toggle('ledger-calculated',!expanded);
  });
})();
