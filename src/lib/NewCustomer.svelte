<script lang="ts">
  import { getContext } from "svelte";
  import { type FormInputData, type TimeSeriesBMI } from "./types";

  let backend = getContext("backend-url-base");
  let { setComplete }: { setComplete: (val: boolean) => void } = $props();
</script>

<div>
  <form
    action={`${backend}/data`}
    onsubmit={async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const formData = new FormData(form);
      const plainObject = Object.fromEntries(formData.entries());
      const body = JSON.stringify(plainObject);
      console.log(body);
      const parsedBody: FormInputData = {
        fname: plainObject.fname as string,
        lname: plainObject.lname as string,
        age: Number.parseInt(plainObject.age as string),
        heightMetre: Number.parseFloat(plainObject.heightMetre as string),
        weightKg: Number.parseFloat(plainObject.weightKg as string),
        situation: plainObject.situation as string,
        timestamp: Date.now(),
      };
      const postBody: TimeSeriesBMI = { ...parsedBody };
      console.log(parsedBody);
      const response = await fetch(form.action, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(postBody),
      });
      if (response.ok) {
        setComplete(true);
      }
    }}
  >
    <p class="text-md">Basic information</p>

    <div class="input-group mb-3">
      <input
        type="text"
        class="form-control"
        id="fname"
        name="fname"
        placeholder="First name"
      />
      <input
        type="text"
        class="form-control"
        id="lname"
        name="lname"
        placeholder="Last name"
      />
    </div>
    <div class="input-group mb-3">
      <span class="input-group-text" id="age">Age</span>
      <input type="number" class="form-control" id="age" name="age" />

      <span class="input-group-text" id="height-label">Height (m)</span>
      <input
        type="number"
        class="form-control"
        id="height"
        name="heightMetre"
      />

      <span class="input-group-text" id="weight-label">Weight (kg)</span>
      <input type="number" class="form-control" id="weight" name="weightKg" />
    </div>
    <p class="text-md">Describe your situation</p>
    <div class="mb-3">
      <textarea class="form-control" id="situation" name="situation" rows="3"
      ></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
