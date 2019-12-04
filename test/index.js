const Anise = require("anisejs");

const Title = <h1>Hello World</h1>;

const Greet = (props) => {
  return <span>Hello {props.name}</span>;
};

Anise.append(document.getElementById("app"), <div>
  <Title />
  <Greet name="Ian"/>
</div>);
