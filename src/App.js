import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API, Storage } from 'aws-amplify';
import {
  Button,
  Flex,
  Heading,
  Image,
  Text,
  TextField,
  View,
  withAuthenticator,
} from '@aws-amplify/ui-react';
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";
import { SEASONS } from "./season";
import { USAGES } from "./usage";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes, authMode: 'AMAZON_COGNITO_USER_POOLS' });
    const notesFromAPI = apiData.data.listNotes.items;
    await Promise.all(
      notesFromAPI.map(async (note) => {
        if (note.image) {
          const url = await Storage.vault.get(note.name);
          note.image = url;
        }
        return note;
      })
    );
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    const data = {
      name: form.get("name"),
      description: form.get("description"),
      image: image.name,
    };
    if (!!data.image) await Storage.vault.put(data.name, image);
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id, name }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await Storage.vault.remove(name);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
      authMode: 'AMAZON_COGNITO_USER_POOLS'
    });
  }

  const [seasons, setSeasons] = useState(
    new Array(SEASONS.length).fill(false)
  );

  const [usages, setUsages] = useState(
    new Array(USAGES.length).fill(false)
  );

  const handleOnChange = (checkboxes, setCheckboxes, position) => {
    const updatedCheckboxes = checkboxes.map((item, index) =>
      index === position ? !item : item
    );
    setCheckboxes(updatedCheckboxes);
  };

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <View
            name="image"
            as="input"
            type="file"
            style={{ alignSelf: "end" }}
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
          <h4>Seasons</h4>
          <ul className="seasons-list">
            {SEASONS.map(({ label, _ }, index) => {
              return (
                <li key={label}>
                  <div className="seasons-list-item">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${label}`}
                      name={label}
                      value={label}
                      checked={seasons[index]}
                      onChange={() => handleOnChange(seasons, setSeasons, index)}
                    />
                    <label htmlFor={`custom-checkbox-${label}`}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>

          <h4>Usage</h4>
          <ul className="seasons-list">
            {USAGES.map(({ label, _ }, index) => {
              return (
                <li key={label}>
                  <div className="seasons-list-item">
                    <input
                      type="checkbox"
                      id={`custom-checkbox-${label}`}
                      name={label}
                      value={label}
                      checked={usages[index]}
                      onChange={() => handleOnChange(usages, setUsages, index)}
                    />
                    <label htmlFor={`custom-checkbox-${label}`}>{label}</label>
                  </div>
                </li>
              );
            })}
          </ul>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            {note.image && (
              <Image
                src={note.image}
                alt={`visual aid for ${notes.name}`}
                style={{ width: 400 }}
              />
            )}
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
