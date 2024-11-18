<script>
    import { Navbar, NavBrand } from 'flowbite-svelte';
    import "../app.css";
  </script>
  <div>
    
    <Navbar class="px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b">
      <NavBrand href="/">
        <img src="/logo.svg" class="me-3 h-6 sm:h-9" alt="SpaceX Logo" />
      </NavBrand>
   
    </Navbar>
    
 

  <div class="pt-16">
    <slot />
  </div>
  
  
</div>
