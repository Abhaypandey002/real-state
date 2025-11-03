import './Stats.css';

const stats = [
  { value: '500+', label: 'Happy Customers Delivered' },
  { value: '20+', label: 'Exclusive Residential Projects' },
  { value: '15 yrs', label: 'Of Building Trust' }
];

const Stats = () => {
  return (
    <section className="stats">
      {stats.map((item) => (
        <div key={item.label} className="stats__item">
          <span className="stats__value">{item.value}</span>
          <span className="stats__label">{item.label}</span>
        </div>
      ))}
    </section>
  );
};

export default Stats;
