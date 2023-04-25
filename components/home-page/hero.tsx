import Image from 'next/image';
import classes from './hero.module.css';

function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image src='/images/site/cicero.jpg' alt='Cicero' width={300} height={300} />
      </div>
      <h1>Hail, I am Cicero</h1>
      <p>
        I am a Roman statesman and Philosopher. I "blog" about such topics here.
      </p>
    </section>
  )
}

export default Hero;