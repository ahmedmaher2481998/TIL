<script setup lang="ts">
import { CardHeader, CardTitle, Card, CardDescription, CardContent, Label, Button, CardFooter, Input } from '@/component'
</script>
<template>

  <Card>
    <CardHeader>
      <CardTitle>Account</CardTitle>
      <CardDescription>
        Make changes to your account here. Click save when you're done.
      </CardDescription>
    </CardHeader>
    <CardContent class="space-y-2">
      <div class="space-y-1">
        <Label for="name">Name</Label>
        <Input id="name" default-value="Pedro Duarte" />
      </div>
      <div class="space-y-1">
        <Label for="username">Username</Label>
        <Input id="username" default-value="@peduarte" />
      </div>
    </CardContent>
    <CardFooter>
      <Button>Save changes</Button>
    </CardFooter>
  </Card>
</template>