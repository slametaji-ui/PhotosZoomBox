var clientRootDir='{{ url() }}';var div=document.createElement('div');div.className="zoombox-box";div.innerHTML=`
<div class="zoombox-close-bg"></div>
<img class='zoombox-image slide' src='/assets/icons/load.svg'>
<p class='zoombox-zoomValue'>100%</p>
<p class='zoombox-caption'>caption</p>
<p class='zoombox-count'>Image 1 of 9</p>
<p class='zoombox-about'>PhotosZoomBox By <a href='https://slametaji-ui.github.io/' target='_blank'>Sla Media</a></p>
<div class='zoombox-preview'>

</div>
<img class='zoombox-close zoombox-controls' src='/assets/icons/close.png'>
<img class='zoombox-next zoombox-controls' src='/assets/icons/next.png'>
<img class='zoombox-prev zoombox-controls' src='/assets/icons/prev.png'>
<img class='zoombox-play zoombox-controls' src='/assets/icons/play.png'>
<img class='zoombox-zoom-in zoombox-controls' src='/assets/icons/zoom-in.png'>
<img class='zoombox-zoom-out zoombox-controls' src='/assets/icons/zoom-out.png'>

<hidden class='zoombox-prop' slideShowInter='2000' LockBodyScroll='true' enableZoom='3' enableTouchControl='true' enableSlideShow='true' enableNavigation='true'></hidden>`;document.body.append(div);class zoomboxImages{constructor(zoomboxGroup,src,src2,caption,index){this.index=index;this.src=src;this.src2=src2;this.caption=caption;this.currIndex=undefined;this.isplaying=!1;this.loadImage=document.createElement('img');this.prop=document.querySelector('.zoombox-prop');this.slideTimeOut=undefined;this.slideShowInter=this.prop.getAttribute('slideShowInter');this.LockBodyScroll=this.prop.getAttribute('LockBodyScroll');this.enableZoom=this.prop.getAttribute('enableZoom');this.enableTouchControl=this.prop.getAttribute('enableTouchControl');this.enableNavigation=this.prop.getAttribute('enableNavigation');this.enableSlideShow=this.prop.getAttribute('enableSlideShow');this.zoomAmount=1.3;this.zoomboxImage=document.querySelector('.zoombox-image');this.zoomboxCaption=document.querySelector('.zoombox-caption');this.images=document.querySelectorAll(`${zoomboxGroup}`);this.zoomboxBox=document.querySelector('.zoombox-box');this.zoomboxClose=document.querySelector('.zoombox-close');this.zoomboxCloseBg=document.querySelector('.zoombox-close-bg');this.zoomboxCount=document.querySelector('.zoombox-count');this.zoomboxNext=document.querySelector('.zoombox-next');this.zoomboxPrev=document.querySelector('.zoombox-prev');this.zoomboxPlay=document.querySelector('.zoombox-play');this.zoomboxZoomIn=document.querySelector('.zoombox-zoom-in');this.zoomboxZoomOut=document.querySelector('.zoombox-zoom-out');this.zoomboxPreview=document.querySelector('.zoombox-preview');this.previewImages=[];this.zoomboxZoomValue=document.querySelector('.zoombox-zoomValue');this.zoomboxAbout=document.querySelector('.zoombox-about');this.imagesCount=this.images.length;this.initialTouchPosition=undefined;this.zoomValueTimeout=undefined}
putImage(){this.zoomboxBox.style.display='block';document.body.style.overflow=(this.LockBodyScroll=="true")?'hidden':'auto';this.zoomboxBox.style.animationName='in';this.zoomboxCount.innerHTML=`${this.index +1} / ${this.imagesCount}`;this.currIndex=this.index;(this.src2)?this.loadImage.src=this.src2:this.loadImage.src=this.src;this.zoomboxImage.src=`/assets/icons/load.svg`;this.loadImage.onload=()=>{this.zoomboxImage.src=this.loadImage.src}
this.zoomboxCaption.innerHTML=this.caption;this.images.forEach((img,index)=>{let pre=document.createElement('div');let image=document.createElement('img');image.className='preview-image';image.src=img.src;pre.className='preview-box';pre.append(image);this.previewImages.push(pre);pre.onclick=()=>{this.nextPrevImage(index);this.checkPlay(!0)}
this.zoomboxPreview.append(pre)})
this.markActiveImage(this.index);this.zoomboxPreview.style.transform=`translateX(-${((this.currIndex/this.images.length)*100)}%)`;window.onkeydown=(e)=>{this.addEvents(e)}
window.onwheel=(e)=>{this.zoomin(e)}}
markActiveImage(index){this.currIndex=index;this.zoomboxPreview.style.transform=`translateX(-${(index/this.images.length)*100}%)`;this.previewImages.forEach((box,boxIndex)=>{(index==boxIndex)?box.setAttribute('zoombox-active','yes'):box.setAttribute('zoombox-active','no')})}
closeZoombox(){this.zoomboxBox.style.opacity='0';document.body.style.overflow='auto';this.checkPlay(!0);setTimeout(()=>{this.zoomboxBox.style.display='none';this.zoomboxBox.style.opacity='1';let last=this.zoomboxPreview.lastElementChild;while(last){this.zoomboxPreview.removeChild(last);last=this.zoomboxPreview.lastElementChild}},200);this.loadImage.onload=()=>{}
window.onkeydown=(e)=>{}
window.onwheel=(e)=>{}}
nextImage(){this.checkPlay(!0);(this.currIndex>=this.images.length-1)?this.currIndex=0:this.currIndex++;this.nextPrevImage(this.currIndex)}
prevImage(){this.checkPlay(!0);(this.currIndex<=0)?this.currIndex=this.images.length-1:this.currIndex--;this.nextPrevImage(this.currIndex)}
checkPlay(isplay){this.zoomboxImage.style.transform=` translate(-50%,-50%) scale(1)`;if(isplay){this.isplaying=!1;this.zoomboxPlay.src=`/assets/icons/play.png`;clearTimeout(this.slideTimeOut)}else{this.isplaying=!0;this.zoomboxPlay.src=`/assets/icons/pause.png`;this.slideShow()}}
nextPrevImage(imageIndex){let src=this.images[imageIndex].getAttribute('src2');this.zoomboxCount.innerHTML=`${imageIndex +1} / ${this.imagesCount}`;this.markActiveImage(imageIndex);this.zoomboxImage.src=`/assets/icons/load.svg`;this.loadImage.src=(src)?src:this.images[imageIndex].src;this.loadImage.onload=()=>{this.zoomboxImage.classList.remove('slide');this.zoomboxImage.offsetWidth;this.zoomboxImage.classList.add('slide');this.zoomboxImage.src=this.loadImage.src}
this.zoomboxCaption.innerHTML=this.images[imageIndex].alt}
slideShow(){clearTimeout(this.slideTimeOut);(this.currIndex>=this.images.length-1)?this.currIndex=0:this.currIndex++;this.markActiveImage(this.currIndex);this.zoomboxCount.innerHTML=`${this.currIndex +1} / ${this.imagesCount}`;this.zoomboxCaption.innerHTML=this.images[this.currIndex].alt;let src2=this.images[this.currIndex].getAttribute('src2');this.zoomboxImage.src=`/assets/icons/load.svg`;this.loadImage.src=(src2)?src2:this.images[this.currIndex].src;this.loadImage.onload=()=>{this.zoomboxImage.classList.remove('slide');this.zoomboxImage.offsetWidth;this.zoomboxImage.classList.add('slide');this.zoomboxImage.src=this.loadImage.src;this.slideTimeOut=setTimeout(this.slideShow.bind(this),this.slideShowInter)}}
addEvents(e){if(e.keyCode==39)(this.enableNavigation=='true')?this.nextImage():'';else if(e.keyCode==37)(this.enableNavigation=='true')?this.prevImage():'';else if(e.keyCode==32)(this.enableSlideShow=='true')?this.checkPlay(this.isplaying):'';else if(e.keyCode==38)
this.clickToZoom(-1);else if(e.keyCode==40)
this.clickToZoom(1)}
zoomin(e){let x;let y;if(this.enableZoom==2){document.body.style.overflow='hidden';x=y=50}else if(this.enableZoom==3){document.body.style.overflow='hidden';x=(e.clientX/window.innerWidth)*110;y=(e.clientY/window.innerHeight)*110}else return;this.checkPlay(!0);clearTimeout(this.zoomValueTimeout);if(e.deltaY<0)(this.zoomAmount>2.7)?this.zoomAmount=3:this.zoomAmount+=0.3;else(this.zoomAmount<1.3)?this.zoomAmount=1:this.zoomAmount-=0.3;this.zoomboxZoomValue.innerHTML=`${Math.ceil((this.zoomAmount / 1)*100)}%`;this.zoomboxImage.style.transform=` translate(-50%,-50%) scale(${this.zoomAmount})`;this.zoomboxZoomValue.style.opacity='1';this.zoomValueTimeout=setTimeout(()=>{this.zoomboxZoomValue.style.opacity='0'},1000);if(this.zoomAmount==3)return;this.zoomboxImage.style.transformOrigin=`${x}% ${y}% `}
clickToZoom(n){if(n!=1&&n!=-1)
return;this.checkPlay(!0);clearTimeout(this.zoomValueTimeout);if(n==1){(this.zoomAmount<1.3)?this.zoomAmount=1:this.zoomAmount-=0.3}else if(n==-1){(this.zoomAmount>2.7)?this.zoomAmount=3:this.zoomAmount+=0.3}
this.zoomboxZoomValue.innerHTML=`${Math.ceil((this.zoomAmount / 1)*100)}%`;this.zoomboxImage.style.transform=` translate(-50%,-50%) scale(${this.zoomAmount})`;this.zoomboxZoomValue.style.opacity='1';this.zoomValueTimeout=setTimeout(()=>{this.zoomboxZoomValue.style.opacity='0'},1000)}
touchControl(){this.zoomboxBox.ontouchend=(e)=>{this.touchEnd(e)}
this.zoomboxBox.ontouchstart=(e)=>{this.touchStart(e)}}
touchStart(e){this.initialTouchPosition=e.changedTouches[0]}
touchEnd(f){var finalTouchPosition=f.changedTouches[0];var x=this.initialTouchPosition.clientX-finalTouchPosition.clientX;var y=this.initialTouchPosition.clientY-finalTouchPosition.clientY;if(Math.abs(x)>Math.abs(y)){if(x<-30){this.prevImage()}
else if(x>30){this.nextImage()}}}
option(obj){this.zoomboxBox.style.backgroundColor=`rgba(17,17,17,${(obj.backgroundOpacity!=null) ? obj.backgroundOpacity : 0.9})`;this.zoomboxImage.style.animationDuration=(obj.imageTransTimimg)?obj.imageTransTimimg:'.5s';this.slideShowInter=this.prop.setAttribute('slideShowInter',(obj.slideShowInterval)?obj.slideShowInterval*1000:2000);this.LockBodyScroll=this.prop.setAttribute('LockBodyScroll',(obj.lockBodyScroll==!1)?obj.lockBodyScroll:!0);this.enableZoom=this.prop.setAttribute('enableZoom',(obj.enableScrollZoom?obj.enableScrollZoom:2));this.zoomboxZoomIn.style.display=(obj.enableZoomButton)?'block':'none';this.zoomboxZoomOut.style.display=(obj.enableZoomButton)?'block':'none';this.zoomboxAbout.style.display=(obj.hideWatermark)?'none':'block';this.enableTouchControl=this.prop.setAttribute('enableTouchControl',(obj.enableTouchControl==!1)?'false':'true');this.enableNavigation=this.prop.setAttribute('enableNavigation',(obj.enableNavigation==!1)?'false':'true');this.enableSlideShow=this.prop.setAttribute('enableSlideShow',(obj.enableSlideShow==!1)?'false':'true');clientRootDir=(obj.hasRoot)?'/':''}
execute(){this.putImage();this.zoomboxClose.onclick=()=>{this.closeZoombox()}
this.zoomboxCloseBg.onclick=()=>{this.closeZoombox()}
if(this.enableNavigation=='true'){this.zoomboxNext.onclick=()=>this.nextImage();this.zoomboxPrev.onclick=()=>this.prevImage();if((this.enableTouchControl)=="true"){this.touchControl()}}else{this.zoomboxPreview.style.display='none';this.zoomboxNext.style.display="none";this.zoomboxPrev.style.display="none"}
this.zoomboxZoomIn.onclick=()=>{this.clickToZoom(-1)}
this.zoomboxZoomOut.onclick=()=>{this.clickToZoom(1)}
if(this.enableSlideShow=='true')
this.zoomboxPlay.onclick=()=>this.checkPlay(this.isplaying);else this.zoomboxPlay.style.display='none'}}
var zoombox=new zoomboxImages;function zoomBoxExecute(){const imageGroup=document.querySelectorAll('[zoombox]');var groupName=[];imageGroup.forEach((image)=>{let att=image.getAttribute('zoombox');if(att==""){image.setAttribute('zoombox','default');att='default'}
if(!(groupName.includes(att)))
groupName.push(att)})
groupName.forEach((group)=>{var images=document.querySelectorAll(`[zoombox=${group}]`);images.forEach((img,index)=>{img.onclick=()=>{var groupName=img.getAttribute('zoombox');zoombox=new zoomboxImages(`[zoombox=${groupName}]`,img.src,img.getAttribute('src2'),img.alt,index);zoombox.execute();document.querySelector('.zoombox-close').src=`/assets/icons/close.png`;document.querySelector('.zoombox-zoom-in').src=`/assets/icons/zoom-in.png`;document.querySelector('.zoombox-zoom-out').src=`/assets/icons/zoom-out.png`;document.querySelector('.zoombox-next').src=`/assets/icons/next.png`;document.querySelector('.zoombox-prev').src=`/assets/icons/prev.png`;document.querySelector('.zoombox-play').src=`/assets/icons/play.png`}})})}
zoomBoxExecute();zoombox.option({})