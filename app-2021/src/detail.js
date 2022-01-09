class Detail extends HTMLElement {
  /** @type List */
  list;

  /** @type crud<address> */
  crud;

  /** @type address */
  #data;

  /** @return address */
  get data() {
    return this.#data;
  }

  /**
   * @param {address} value
   */
  set data(value) {
    this.#data = value;

    const self = this;

    this.innerHTML = `
      <form>
        <label>First Name</label><input placeholder="First Name" required type="text" id="firstName" value="${value.firstName}">
        <label>Last Name</label><input placeholder="Last Name" required type="text" id="lastName" value="${value.lastName}">
      </form>
    `;

    const saveButton = document.createElement("button");
    saveButton.id = "save";
    saveButton.textContent = "Save";
    saveButton.addEventListener("click", async e => {
      await self.saveDetail(value);
      e.preventDefault();
    });

    const [form] = this.getElementsByTagName("form");

    const inputs = form.getElementsByTagName("input");

    for (const input of inputs) {
      input.addEventListener("input", e => {
        saveButton.disabled = !e.target.checkValidity();
      });
    }

    form.append(document.createElement("span")); // spacer in the first column
    form.append(saveButton);
  }

  /**
   * @param {address} address
   */
  async saveDetail(address) {
    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");

    address.firstName = firstName.value;
    address.lastName = lastName.value;

    await this.crud.update(address);

    this.list.selected = address;
  }
}

customElements.define("app-detail", Detail);
