import { FooterMain } from "@/components/footer";
import HeaderMain from "@/components/headerMain";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Layout } from "antd";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

export default function About() {
  const navigate = useNavigate();

  return (
    <Layout>
      <HeaderMain />
      <Content>
        <div className="container mx-auto px-24 py-8">
          <h1 className="text-3xl font-bold text-center mb-8">
            About Uzairways
          </h1>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <img
                src="/about.jpg"
                alt="Uzairways aircraft"
                width={600}
                height={400}
                className="rounded-lg shadow-md"
              />
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
              <p className="mb-4">
                Uzairways is Uzbekistan's premier airline, committed to
                connecting the heart of Central Asia to the world. Since our
                establishment, we have been dedicated to providing safe,
                comfortable, and reliable air travel experiences to our valued
                passengers.
              </p>
              <p className="mb-4">
                With a modern fleet and a team of highly skilled professionals,
                we strive to showcase the warmth of Uzbek hospitality at 30,000
                feet and beyond.
              </p>
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-4 text-center">
              Our Mission
            </h2>
            <p className="text-center max-w-2xl mx-auto">
              To be the leading airline in Central Asia, offering world-class
              services while promoting Uzbekistan's rich culture and heritage to
              the global community.
            </p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold mb-6 text-center">
              Why Choose Uzairways
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Modern Fleet",
                  description:
                    "Experience comfort and safety with our state-of-the-art aircraft.",
                },
                {
                  title: "Extensive Network",
                  description:
                    "Connect to major cities across Asia, Europe, and beyond.",
                },
                {
                  title: "Uzbek Hospitality",
                  description:
                    "Enjoy warm, personalized service rooted in Uzbek traditions.",
                },
              ].map((feature, index) => (
                <Card key={index} className="bg-muted p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p>{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12 text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Ready to Fly with Us?
            </h2>
            <Button
              style={{ backgroundColor: "#479fe1" }}
              onClick={() => navigate("/")}
              size="lg"
            >
              Book Your Flight Now
            </Button>
          </div>
        </div>
      </Content>
      <FooterMain />
    </Layout>
  );
}
