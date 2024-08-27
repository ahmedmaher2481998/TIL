<script setup lang="ts">
// TODO
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  FormInputField,
  TagSelector,
  ImageUpload,
  Button,
  MarkDownContentInput,
  FormField,
  useToast
} from '@/components'
import { createBlogZodSchema } from '@/types'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { slugify } from '@/utils'
import { computed, watch } from 'vue'
import { useAuth, useBlogs } from '@/stores'
import type { z } from 'zod'
import { storeToRefs } from 'pinia'
const { AuthStoreState } = storeToRefs(useAuth())

const defaultBlogData = {
  title: 'The Haunting of the Forgotten Doll: A Dark Childhood Tale',
  tldr: 'A young girl, Emily, is haunted by strange voices and dark presences after discovering a cursed doll in her attic. Her investigation leads to terrifying consequences as the darkness consumes her, culminating in her mysterious disappearance.',
  description:
    "In \"The Haunting of the Forgotten Doll: A Dark Childhood Tale,\" a young girl named Emily is plagued by eerie voices and shadowy figures after discovering a mysterious, old doll in her attic. Despite her parents' dismissal of her fears, Emily's life spirals into a nightmare as she becomes entangled in the dark secrets hidden within the doll. As the haunting intensifies, Emily's courage is tested, leading to a chilling climax where she confronts the darkness head-on, only to vanish without a trace. This suspenseful story explores themes of fear, isolation, and the unseen horrors that lurk in the shadows of a troubled childhood.",

  slug: 'slug',

  content: `# A Dark Childhood

## Chapter 1: The Old House

It was a cold, stormy night when Emily first noticed the strange noises coming from the attic. She had always been afraid of that part of the house, the old wooden beams creaking under the weight of forgotten memories. The shadows seemed to stretch out and reach for her, their long fingers curling around her small, trembling frame.

Her parents had never paid much attention to her fears. "Just your imagination," they would say, dismissing her with a wave of their hands. But Emily knew better. There was something in that attic, something that waited for the night to fall.

## Chapter 2: The Voices

As the weeks went by, the noises grew louder. What started as faint whispers had now turned into full conversations, voices she couldn't understand but felt deep within her bones. She tried to tell her parents again, but they brushed her off, too consumed with their own problems to care.

One night, she decided to investigate. Armed with only a flickering candle and her courage, she made her way up the creaky stairs. Each step echoed through the empty house, a sound that seemed to grow louder with each passing second.

## Chapter 3: The Discovery

When Emily reached the attic, she found it filled with dust and cobwebs, the remnants of a life long forgotten. In the far corner, she noticed a small, wooden box, half-buried under old blankets. It was locked, but the key was nowhere to be found.

The voices grew louder as she approached the box, a cacophony of whispers urging her to open it. Her hands trembled as she reached for the lid, feeling an icy coldness seep into her skin.

## Chapter 4: The Box

Emily found a rusty crowbar nearby and used it to pry the box open. Inside, she discovered an old, tattered doll, its eyes wide open and staring into nothingness. The doll's face was cracked, its porcelain skin chipped away in places, revealing a dark, hollow interior.

As she held the doll, the voices suddenly stopped, replaced by an eerie silence. Emily's heart raced as she realized she had unleashed something from the box, something that had been trapped for years.

## Chapter 5: The Haunting

That night, the nightmares began. Emily dreamed of a little girl, pale and gaunt, with empty eyes and a voice that echoed in her mind. The girl would stand at the foot of her bed, watching, waiting, and Emily could feel her cold presence even when she was awake.

Her parents noticed the change in her but dismissed it as just a phase. They didn't see the shadows that followed her, the way the darkness seemed to cling to her every step. They didn't hear the whispers that filled her ears, telling her secrets she was too young to understand.

## Chapter 6: The End

As the days turned into weeks, Emily grew weaker, her once bright eyes now dull and lifeless. She knew she couldn't escape whatever she had unleashed, that it was only a matter of time before it consumed her completely.

One night, as the wind howled outside her window, Emily finally gave in. She climbed up to the attic one last time, carrying the doll with her. She placed it back in the box and closed the lid, sealing away the darkness that had haunted her.

But as she turned to leave, she felt a cold hand on her shoulder, and the whispers began again. This time, they were not just in her mind.

Emily was never seen again.

## Epilogue

Years later, the old house stood empty, abandoned by the family who could no longer bear to live there. The townsfolk spoke in hushed tones about the little girl who disappeared, about the strange noises that still echoed through the night.

And in the attic, the box remained, untouched, waiting for the next curious soul to open it.

---

**Author's Note:** This story is a work of fiction, inspired by the eerie tales of haunted houses and forgotten children. It serves as a reminder that some doors are better left closed, and some secrets should remain buried.
`,
  tags: undefined,
  image: undefined,
  readCount: 0,
  author_id: AuthStoreState.value.id
}
const { toast } = useToast()
const createBlogSchema = toTypedSchema(createBlogZodSchema)
const {
  handleSubmit,
  values: formValues,
  resetForm,
  setFieldValue,
  errors: formErrors,
  setValues
} = useForm({
  validationSchema: createBlogSchema,
  initialValues: defaultBlogData
})

function onInvalidSubmit({
  // values,
  errors
  // ...rest
}: {
  values: typeof formValues
  errors: typeof formErrors
  rest: any
}) {
  console.log(errors)
  toast({
    title: 'Uh oh! please make sure all fields are valid.',
    description: `please enter: ${Object.keys(errors).join(', ')}`,
    variant: 'destructive'
  })
}

const { CreateBlogPost } = useBlogs()
async function onSuccess(values: z.infer<typeof createBlogZodSchema>) {
  await CreateBlogPost(values)

  console.log('Form submitted!', values)
}
// @ts-ignore
const onSubmit = handleSubmit.withControlled(onSuccess, onInvalidSubmit)
// create slug out of the title onchange
watch(formValues, () => {
  setFieldValue('slug', slugify(formValues.title ?? ''), true)
})
watch([AuthStoreState, formValues], () => {
  setFieldValue('author_id', AuthStoreState.value.id, true)
})
</script>

<template>
  <Card class="max-w-screen-lg mx-auto px-4">
    <CardHeader>
      <CardTitle>Add new blog post</CardTitle>
      <CardDescription>Give your ideas the exposure it deserve</CardDescription>
    </CardHeader>
    <form @submit="onSubmit" keep-values>
      <CardContent class="space-y-4">
        <!-- Form Fields -->
        <!-- blog Title / slug  -->
        <FormInputField
          field-name="title"
          placeholder="Subject title...."
          field-label="Post title"
        />

        <!-- blog Tldr -->
        <FormInputField field-name="tldr" placeholder="summary of the article" field-label="Tldr" />
        <!-- blog Description -->
        <FormInputField
          field-name="description"
          placeholder="a sneak peak into post content"
          field-label="Description"
        />
        <!-- blog tag Selector  -->
        <TagSelector />
        <!-- Upload blog cover  -->
        <ImageUpload title="Blog Cover" name="image" />
        <!-- write markdown blog Content -->
        <MarkDownContentInput />
      </CardContent>
      <CardFooter class="flex mt-10 justify-between px-6 pb-6">
        <Button type="button" variant="destructive" @click="resetForm"> clear </Button>
        <Button type="submit">Publish</Button>
      </CardFooter>
    </form>
  </Card>
</template>

<style></style>
