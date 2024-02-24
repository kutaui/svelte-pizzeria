<script lang="ts">
  interface Props {
    addressProps: {
      phone: string | undefined;
      streetAddress: string | undefined;
      postalCode: string | undefined;
      city: string | undefined;
      country: string | undefined;
    };
  }

  let { addressProps } = $props<Props>();
  let { phone, streetAddress, postalCode, city, country } =
    $state(addressProps);
</script>

<label for="telephone">Phone</label>
<input
  name="telephone"
  type="tel"
  placeholder="Phone number"
  bind:value={phone}
/>
<label for="address">Street address</label>
<input
  name="address"
  type="text"
  placeholder="Street address"
  bind:value={streetAddress}
/>
<div class="grid grid-cols-2 gap-2">
  <div>
    <label for="postal">Postal code</label>
    <input
      name="postal"
      type="text"
      placeholder="Postal code"
      bind:value={postalCode}
    />
  </div>
  <div>
    <label for="city">City</label>
    <input name="city" type="text" placeholder="City" bind:value={city} />
  </div>
</div>
<label for="country">Country</label>
<input name="country" type="text" placeholder="Country" bind:value={country} />
