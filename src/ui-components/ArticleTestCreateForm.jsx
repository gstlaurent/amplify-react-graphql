/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { API } from "aws-amplify";
import { createArticleTest } from "../graphql/mutations";
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function ArticleTestCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    image: "",
    seasons: [],
    usage: "",
    createdAt: "",
    owner: "",
  };
  const [image, setImage] = React.useState(initialValues.image);
  const [seasons, setSeasons] = React.useState(initialValues.seasons);
  const [usage, setUsage] = React.useState(initialValues.usage);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [owner, setOwner] = React.useState(initialValues.owner);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setImage(initialValues.image);
    setSeasons(initialValues.seasons);
    setCurrentSeasonsValue("");
    setUsage(initialValues.usage);
    setCreatedAt(initialValues.createdAt);
    setOwner(initialValues.owner);
    setErrors({});
  };
  const [currentSeasonsValue, setCurrentSeasonsValue] = React.useState("");
  const seasonsRef = React.createRef();
  const getDisplayValue = {
    seasons: (r) => {
      const enumDisplayValueMap = {
        SPRING: "Spring",
        SUMMER: "Summer",
        FALL: "Fall",
        WINTER: "Winter",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    image: [{ type: "Required" }],
    seasons: [],
    usage: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    owner: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          image,
          seasons,
          usage,
          createdAt,
          owner,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await API.graphql({
            query: createArticleTest.replaceAll("__typename", ""),
            variables: {
              input: {
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "ArticleTestCreateForm")}
      {...rest}
    >
      <TextField
        label="Image"
        isRequired={true}
        isReadOnly={false}
        value={image}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image: value,
              seasons,
              usage,
              createdAt,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.image ?? value;
          }
          if (errors.image?.hasError) {
            runValidationTasks("image", value);
          }
          setImage(value);
        }}
        onBlur={() => runValidationTasks("image", image)}
        errorMessage={errors.image?.errorMessage}
        hasError={errors.image?.hasError}
        {...getOverrideProps(overrides, "image")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              image,
              seasons: values,
              usage,
              createdAt,
              owner,
            };
            const result = onChange(modelFields);
            values = result?.seasons ?? values;
          }
          setSeasons(values);
          setCurrentSeasonsValue("");
        }}
        currentFieldValue={currentSeasonsValue}
        label={"Seasons"}
        items={seasons}
        hasError={errors?.seasons?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("seasons", currentSeasonsValue)
        }
        errorMessage={errors?.seasons?.errorMessage}
        getBadgeText={getDisplayValue.seasons}
        setFieldValue={setCurrentSeasonsValue}
        inputFieldRef={seasonsRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Seasons"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentSeasonsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.seasons?.hasError) {
              runValidationTasks("seasons", value);
            }
            setCurrentSeasonsValue(value);
          }}
          onBlur={() => runValidationTasks("seasons", currentSeasonsValue)}
          errorMessage={errors.seasons?.errorMessage}
          hasError={errors.seasons?.hasError}
          ref={seasonsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "seasons")}
        >
          <option
            children="Spring"
            value="SPRING"
            {...getOverrideProps(overrides, "seasonsoption0")}
          ></option>
          <option
            children="Summer"
            value="SUMMER"
            {...getOverrideProps(overrides, "seasonsoption1")}
          ></option>
          <option
            children="Fall"
            value="FALL"
            {...getOverrideProps(overrides, "seasonsoption2")}
          ></option>
          <option
            children="Winter"
            value="WINTER"
            {...getOverrideProps(overrides, "seasonsoption3")}
          ></option>
        </SelectField>
      </ArrayField>
      <SelectField
        label="Usage"
        placeholder="Please select an option"
        isDisabled={false}
        value={usage}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              seasons,
              usage: value,
              createdAt,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.usage ?? value;
          }
          if (errors.usage?.hasError) {
            runValidationTasks("usage", value);
          }
          setUsage(value);
        }}
        onBlur={() => runValidationTasks("usage", usage)}
        errorMessage={errors.usage?.errorMessage}
        hasError={errors.usage?.hasError}
        {...getOverrideProps(overrides, "usage")}
      >
        <option
          children="Top"
          value="TOP"
          {...getOverrideProps(overrides, "usageoption0")}
        ></option>
        <option
          children="Bottom"
          value="BOTTOM"
          {...getOverrideProps(overrides, "usageoption1")}
        ></option>
        <option
          children="Dress"
          value="DRESS"
          {...getOverrideProps(overrides, "usageoption2")}
        ></option>
        <option
          children="Outerwear"
          value="OUTERWEAR"
          {...getOverrideProps(overrides, "usageoption3")}
        ></option>
        <option
          children="Shoes"
          value="SHOES"
          {...getOverrideProps(overrides, "usageoption4")}
        ></option>
        <option
          children="Accessory"
          value="ACCESSORY"
          {...getOverrideProps(overrides, "usageoption5")}
        ></option>
        <option
          children="Bag"
          value="BAG"
          {...getOverrideProps(overrides, "usageoption6")}
        ></option>
        <option
          children="Sweater"
          value="SWEATER"
          {...getOverrideProps(overrides, "usageoption7")}
        ></option>
      </SelectField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              image,
              seasons,
              usage,
              createdAt: value,
              owner,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Owner"
        isRequired={false}
        isReadOnly={false}
        value={owner}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              image,
              seasons,
              usage,
              createdAt,
              owner: value,
            };
            const result = onChange(modelFields);
            value = result?.owner ?? value;
          }
          if (errors.owner?.hasError) {
            runValidationTasks("owner", value);
          }
          setOwner(value);
        }}
        onBlur={() => runValidationTasks("owner", owner)}
        errorMessage={errors.owner?.errorMessage}
        hasError={errors.owner?.hasError}
        {...getOverrideProps(overrides, "owner")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
