// /components/Hero.js
import styles from './counters.module.css'

const outcomes = [
  "How to build this landing page with Next.js",
  "How to create API endpoint and integrate with ConvertKit API",
  "How to use React Hook Form and TailwindCSS",
];

const ComingSoonBadge = () => (
  <div>
    Coming Soon!
  </div>
);

const Hero = () => {
    return (
        <div>
            <h2>What you'll learn</h2>
            <ul>
                {outcomes.map((i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
            <ComingSoonBadge />
        </div>
    );
};






export default Hero;
