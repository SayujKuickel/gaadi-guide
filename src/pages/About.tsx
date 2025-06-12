import Heading from "@/components/common/Heading";
import ContainerLayout from "@/layout/ContainerLayout";
import PageLayout from "@/layout/PageLayout";

const About = () => {
  return (
    <PageLayout>
      <ContainerLayout>
        <Heading level={1}>Welcome!</Heading>

        <p className="mt-4 text-base leading-7 text-offText">
          Welcome to the Kathmandu Bus Routes project! This application aims to
          provide a clear and interactive map of various bus routes across
          Kathmandu, Nepal. I am building this app to solve the lack of
          centralized, easily accessible route information.
        </p>

        <p className="mt-4 text-base leading-7 text-offText">
          This project is being actively developed and you can see the full
          feature list I plan to add in the{" "}
          <a
            href="https://www.notion.so/2002054224e68038b8f1dd5e64f0a636?v=2002054224e681548951000c5b4845fc"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Notion page
          </a>
          .
        </p>

        <p className="mt-4 text-base leading-7 text-offText">
          Check out the demo{" "}
          <a
            href="https://bus-routes.sayuj.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            here
          </a>
          .
        </p>

        <Heading level={2} className="mt-10">
          Key Features
        </Heading>

        <ul className="mt-4 list-disc list-inside text-base leading-7 text-offText">
          <li>Interactive map with real-time route visualization</li>
          <li>Search and filter bus routes easily</li>
          <li>View all stops along a selected route</li>
          <li>Jump to a specific stop location on the map</li>
          <li>Mobile-friendly layout for on-the-go navigation</li>
          <li>Designed for both locals and tourists</li>
        </ul>

        <Heading level={2} className="mt-10">
          Developed By
        </Heading>

        <p className="mt-4 text-base leading-7 text-offText">
          This project was developed by{" "}
          <a
            href="https://sayuj.com.np/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            Sayuj Kuickel
          </a>
          . I'm passionate about solving real-world problems using web
          technologies and making public transport more navigable for everyone.
        </p>

        <Heading level={2} className="mt-10">
          Contributors
        </Heading>

        <p className="mt-4 text-base leading-7 text-offText">
          Contributors and sources that have supported this project:
        </p>
        <ul className="mt-4 list-disc list-inside text-base leading-7 text-offText">
          <li>
            <a
              href="https://github.com/SayujKuickel"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              @SayujKuickel
            </a>{" "}
            – Project author and core developer
          </li>
          <li>
            <a
              href="https://github.com/neogeomat/yatayat"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline"
            >
              @amritkarma's yatayat
            </a>{" "}
            – Bus route data used with permission from this open-source project
          </li>
        </ul>

        <Heading level={2} className="mt-10">
          Want to Help?
        </Heading>

        <p className="mt-4 text-base leading-7 text-offText">
          Contributions, ideas, and feedback are very welcome! Whether you're a
          developer, a designer, or just someone familiar with Kathmandu's
          transport system, your help can make this app better for everyone. You
          can reach out via the{" "}
          <a
            href="/contact"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            contact form
          </a>{" "}
          or explore the project on{" "}
          <a
            href="https://github.com/SayujKuickel/kathmandu-bus-routes"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold underline"
          >
            GitHub
          </a>
          .
        </p>
      </ContainerLayout>
    </PageLayout>
  );
};

export default About;
