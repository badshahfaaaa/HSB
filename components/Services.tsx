import { waText } from "@/lib/site";

type Service = {
  title: string;
  text: string;
  image: string;
  alt: string;
};

const SERVICES: Service[] = [
  {
    title: "Buy a Plot",
    text: "Tell us the size and the block. We find plots that are genuinely for sale, walk each one with you, and check all papers before any money is paid.",
    image: "https://images.pexels.com/photos/4525178/pexels-photo-4525178.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "A plot of land with a for sale sign, ready for development",
  },
  {
    title: "Sell a Plot",
    text: "We price your plot against recent sales, show it to serious buyers, and stay with you through the whole transfer at the society office.",
    image: "https://images.pexels.com/photos/7937291/pexels-photo-7937291.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Aerial view of a residential area with plots and houses",
  },
  {
    title: "Buy a House",
    text: "From ready homes to houses still under construction, we show you options that fit your budget and check every document before you commit.",
    image: "https://images.pexels.com/photos/8482520/pexels-photo-8482520.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "A contemporary home with a for sale sign in the front yard",
  },
  {
    title: "Sell a House",
    text: "We list your house with the right buyers, arrange viewings, and handle the paperwork from the first offer to the final transfer.",
    image: "https://images.pexels.com/photos/8482519/pexels-photo-8482519.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Placing a home for sale sign outside a modern house",
  },
  {
    title: "Build a House",
    text: "From the first drawing to the final coat of paint, one team handles everything — foundation, grey structure, finishing and interiors.",
    image: "https://images.pexels.com/photos/7031604/pexels-photo-7031604.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Exterior of a contemporary house with large windows and a green lawn",
  },
  {
    title: "Buy Commercial Property",
    text: "Shops, offices and commercial plots in the right location. We help you find a property that suits your business and check the papers carefully.",
    image: "https://images.pexels.com/photos/16140814/pexels-photo-16140814.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Elegant shopping arcade with modern architecture and glass facades",
  },
  {
    title: "Sell Commercial Property",
    text: "We connect your commercial property with serious buyers and guide you through the transfer process from start to finish.",
    image: "https://images.pexels.com/photos/16140812/pexels-photo-16140812.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Modern shopping center with sleek architecture and glass facades",
  },
  {
    title: "Buy and Sell Shops",
    text: "Shops in markaz areas and commercial strips. Whether you are buying your first shop or selling one, we help you get the right deal.",
    image: "https://images.pexels.com/photos/7629181/pexels-photo-7629181.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Exterior of modern boutiques with signboards in a trading area",
  },
  {
    title: "Buy and Sell Plazas",
    text: "Multi-storey commercial plazas for investment or business use. We check the structure, the papers and the location before you decide.",
    image: "https://images.pexels.com/photos/38399455/pexels-photo-38399455.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "A modern shopping plaza with vibrant signage under a clear sky",
  },
  {
    title: "Buy and Sell Commercial Garages",
    text: "Commercial garages and warehouse spaces for vehicle workshops, storage or industrial use. We help you find or sell the right space.",
    image: "https://images.pexels.com/photos/6895381/pexels-photo-6895381.jpeg?auto=compress&cs=tinysrgb&h=650&w=940",
    alt: "Garage doors inside a commercial warehouse space",
  },
];

const wa = waText("Assalam o Alaikum, I would like to ask about one of your services.");

export function Services() {
  return (
    <section className="services" id="services">
      <div className="wrap">
        <span className="eyebrow" data-rise="">Our Services</span>
        <h2 className="head services__head" data-rise="">
          Real estate and construction,<br />all under one roof
        </h2>
        <p className="lead services__lead" data-rise="">
          From buying your first plot to building a house and selling commercial property — HSB Associates &amp; Builders handles it all.
        </p>
        <div className="services__grid">
          {SERVICES.map((s) => (
            <article className="svc" key={s.title} data-rise="">
              <div className="svc__img">
                <img src={s.image} alt={s.alt} loading="lazy" />
              </div>
              <div className="svc__body">
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="services__cta" data-rise="">
          <a className="btn btn--accent btn--wide" href={wa} target="_blank" rel="noopener">
            <span className="btn__roll"><span data-t="Ask about any service">Ask about any service</span></span>
            <span className="btn__go">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 12h17M14 5l7 7-7 7" /></svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
