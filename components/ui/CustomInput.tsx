import React from 'react'
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control } from 'react-hook-form';
import { z } from 'zod';
interface CustomInput{
    name: string,
    label: string,
    placeholder: string,
    control: Control<z.infer<typeof >>
}

const CustomInput = ({control,name,label,placeholder}:CustomInput) => {
  return (
    <FormField
                control={control}
                name={name}
                render={({ field }) => (
                 <div className="form-item">
                    <FormLabel className="form-label">
                        {label}
                    </FormLabel>
                    <div className="flex w-full flex-col">
                        <FormControl>
                            <Input
                            placeholder={placeholder} className="input-class" {...field}
                            />
                        </FormControl>
                        <FormMessage className=" mt-2 form-message"/>
                    </div>
                 </div>
                )}
              />
  )
}

export default CustomInput