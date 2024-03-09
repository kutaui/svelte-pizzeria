<script>
  import Hero from "$lib/components/Hero.svelte";
  import HomeMenu from "$lib/components/HomeMenu.svelte";
  import SectionHeaders from "$lib/components/SectionHeaders.svelte";
  import { Toaster } from "svelte-french-toast";

</script>

<Hero />
<HomeMenu />
<section class="my-16 text-center" id="about">
  <SectionHeaders subHeader={"Our story"} mainHeader={"About us"} />
  <div class="mx-auto mt-4 flex max-w-md flex-col gap-4 text-gray-500">
    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magni minima
      odit recusandae. Illum ipsa non repudiandae? Eum ipsam iste quos suscipit
      tempora? Aperiam esse fugiat inventore laboriosam officiis quam rem!
    </p>
    <p>
      At consectetur delectus ducimus est facere iure molestias obcaecati
      quaerat vitae voluptate? Aspernatur dolor explicabo iste minus molestiae
      pariatur provident quibusdam saepe?
    </p>
    <p>
      Laborum molestias neque nulla obcaecati odio quia quod reprehenderit sit
      vitae voluptates? Eos, tenetur.
    </p>
  </div>
</section>
<section class="my-8 text-center" id="contact">
  <SectionHeaders subHeader={"Don't hesitate"} mainHeader={"Contact us"} />
  <div class="mt-8">
    <a class="text-4xl text-gray-500 underline" href="tel:+46738123123">
      +46 738 123 123
    </a>
  </div>
</section>
