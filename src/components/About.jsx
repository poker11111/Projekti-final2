import React, { forwardRef } from "react";

const About = forwardRef((props, ref) => {
  const dark = {
    padding: 60,
    background: "#111",
    color: "white",
    textAlign: "center",
  };

  return (
    <section ref={ref} style={dark}>
      <h1>About BTS</h1>
      <p>BTS is focused on modern IT tech, strong quality and real performance.</p>
    </section>
  );
});

export default About;
