<script lang="ts">
  interface Props {
    addressProps: {
      phone: string;
      streetAddress: string;
      postalCode: string;
      city: string;
      country: string;
    };
  }

  let { addressProps } = $props<Props>();
  let { phone, streetAddress, postalCode, city, country } = addressProps;
</script>

<label>Phone</label>
<input type="tel" placeholder="Phone number" value={phone || ""} />
<label>Street address</label>
<input type="text" placeholder="Street address" value={streetAddress || ""} />
<div class="grid grid-cols-2 gap-2">
  <div>
    <label>Postal code</label>
    <input type="text" placeholder="Postal code" value={postalCode || ""} />
  </div>
  <div>
    <label>City</label>
    <input type="text" placeholder="City" value={city || ""} />
  </div>
</div>
<label>Country</label>
<input type="text" placeholder="Country" value={country || ""} />
