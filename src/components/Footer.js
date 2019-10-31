import React from "react";
function Footer(props) {
  let date = props.date;

  return (
    <div class="text-center">
      <p>
        <small>
          Rates provided by https://api.ratesapi.io <br />
          Rates updated as of {date}
        </small>
      </p>
    </div>
  );
}
export default Footer;
