
import cover_img1 from '../../assets/img/people/p1.jpg'
import cover_img2 from '../../assets/img/people/p2.jpg'
import cover_img3 from '../../assets/img/people/p3.jpg'
import cover_img4 from '../../assets/img/people/p4.jpg'
import cover_img5 from '../../assets/img/people/p5.jpg'
import cover_img6 from '../../assets/img/people/p6.jpg'
import cover_img7 from '../../assets/img/people/p7.jpg'
import cover_img8 from '../../assets/img/people/p8.jpg'
import cover_img9 from '../../assets/img/people/p9.jpg'
import cover_img10 from '../../assets/img/people/p10.jpg'
import cover_img11 from '../../assets/img/people/p11.jpg'
import cover_img12 from '../../assets/img/people/p12.jpg'

function CoverImage(){
  const images = [
    cover_img1, cover_img2, cover_img3, cover_img4, cover_img5, 
    cover_img6, cover_img7, cover_img8, cover_img9, cover_img10, 
    cover_img11, cover_img12
  ];
  return(
    <section className='signIn__leftSection'>
        {images.map((img, index) => (
        <img key={index} src={img} alt={`people ${index + 1}`} className='signIn__poster' />
      ))}
      </section>
  )
}

export default CoverImage