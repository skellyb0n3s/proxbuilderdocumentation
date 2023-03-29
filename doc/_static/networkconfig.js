document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("add-yaml");
  const clearButton = document.getElementById("clear-yaml");
  const copyButton = document.getElementById("copy-yaml");

  function appendYaml() {
    const addressInput = document.getElementById("address-input");
    const bridgeInput = document.getElementById("bridge-input");
    const yamlOutput = document.getElementById("yaml-output");

    const newEntry = `  - address: "${addressInput.value}"\n    bridge: "${bridgeInput.value}"\n`;
    if (yamlOutput.value === "") {
      yamlOutput.value = "network:\n";
    }
    yamlOutput.value += newEntry;

    addressInput.value = "";
    bridgeInput.value = "";
  }

  addButton.addEventListener("click", function () {
    appendYaml();
  });

  clearButton.addEventListener("click", function () {
    const yamlOutput = document.getElementById("yaml-output");
    yamlOutput.value = "";
  });

  copyButton.addEventListener("click", function () {
    const yamlOutput = document.getElementById("yaml-output");
    yamlOutput.select();
    document.execCommand("copy");
  });
});
