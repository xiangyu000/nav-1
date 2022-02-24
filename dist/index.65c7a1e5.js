const $sitelist = $('.sitelist');
const $lastLi = $sitelist.find('li.last');
const x = localStorage.getItem('st1');
const stObject = JSON.parse(x);
const hashMap = stObject || [
    {
        logo: 'A',
        logoType: 'text',
        url: 'https://www.acfun.cn'
    },
    {
        logo: './images/bilibili.png',
        logoType: 'image',
        url: 'https://www.bilibili.com'
    }, 
];
const simplurl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};
const render = ()=>{
    $sitelist.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`<li>
        <div class="site">
              <div class="logo">${node.logo[0]}</div>
              <div class="link">${simplurl(node.url)}</div>
              <div class="close"><svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-close"></use></svg></div>
        </div><li>`).insertBefore($lastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation();
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('请输入网址');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    hashMap.push({
        logo: simplurl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    window.localStorage.setItem('st1', string);
};
$(document).on("keypress", (e)=>{
    const key = e.key;
    //可以简写为const{key}=e;
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
});

//# sourceMappingURL=index.65c7a1e5.js.map
