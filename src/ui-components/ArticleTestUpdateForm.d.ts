/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SelectFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
export declare type EscapeHatchProps = {
    [elementHierarchy: string]: Record<string, unknown>;
} | null;
export declare type VariantValues = {
    [key: string]: string;
};
export declare type Variant = {
    variantValues: VariantValues;
    overrides: EscapeHatchProps;
};
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ArticleTestUpdateFormInputValues = {
    image?: string;
    seasons?: string[];
    usage?: string;
    createdAt?: string;
    owner?: string;
};
export declare type ArticleTestUpdateFormValidationValues = {
    image?: ValidationFunction<string>;
    seasons?: ValidationFunction<string>;
    usage?: ValidationFunction<string>;
    createdAt?: ValidationFunction<string>;
    owner?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ArticleTestUpdateFormOverridesProps = {
    ArticleTestUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    image?: PrimitiveOverrideProps<TextFieldProps>;
    seasons?: PrimitiveOverrideProps<SelectFieldProps>;
    usage?: PrimitiveOverrideProps<SelectFieldProps>;
    createdAt?: PrimitiveOverrideProps<TextFieldProps>;
    owner?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ArticleTestUpdateFormProps = React.PropsWithChildren<{
    overrides?: ArticleTestUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    articleTest?: any;
    onSubmit?: (fields: ArticleTestUpdateFormInputValues) => ArticleTestUpdateFormInputValues;
    onSuccess?: (fields: ArticleTestUpdateFormInputValues) => void;
    onError?: (fields: ArticleTestUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ArticleTestUpdateFormInputValues) => ArticleTestUpdateFormInputValues;
    onValidate?: ArticleTestUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ArticleTestUpdateForm(props: ArticleTestUpdateFormProps): React.ReactElement;
