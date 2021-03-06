import React, { useState } from 'react';
import {
  Small, FormContainer, Input, Field, Wrapper,
} from '~/components';
import { showMessage } from 'react-native-flash-message';
import { useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import { Creators as AuthCreators } from '~/store/ducks/auth';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';
import { TextInput, EditButton } from './styles';
import { THEME_COLORS } from '~/utils/constants';

const USER_CHANGE_NAME_MUTATION = gql`
  mutation UpdateUserNameMutation($name: String!, $lastname: String!) {
    UpdateUserNameMutation(input: { name: $name, lastname: $lastname }) {
      user {
        name
        lastname
      }
    }
  }
`;
const Personal = ({ user }) => {
  const dispatch = useDispatch();
  const [fields, setFields] = useState({
    nameEditable: false,
    lastnameEditable: false,
    name: user.name,
    lastname: user.lastname,
  });
  const [updateName] = useMutation(USER_CHANGE_NAME_MUTATION, {
    onCompleted: () => {
      showMessage({
        message: 'Salvo com sucesso!',
        description: 'Os seus dados foram atualizados com sucesso!',
        type: 'success',
        backgroundColor: THEME_COLORS.SECONDARY,
      });
      dispatch(
        AuthCreators.setAuth({
          ...user,
          name: fields.name,
          lastname: fields.lastname,
        }),
      );
    },
    onError: () => {
      showMessage({
        message: 'Erro na atualização de dados!',
        description:
          'Ops! Algum erro no momento da atualização dos dados aconteceu, tente novamente mais tarde.',
        type: 'danger',
      });
    },
  });
  function handleChange(field, enabled) {
    if (!enabled) {
      const { name, lastname } = fields;
      updateName({
        variables: {
          name,
          lastname,
        },
      });
    }
    setFields({
      ...fields,
      [field]: enabled,
    });
  }
  return (
    <FormContainer>
      <Input>
        <Wrapper>
          <Field>Nome</Field>
          <TextInput
            defaultValue={user.name}
            editable={fields.nameEditable}
            onChangeText={text => setFields({
              ...fields,
              name: text,
            })
            }
          />
        </Wrapper>
        <EditButton
          hitSlop={{ top: 15, bottom: 15 }}
          onPress={() => handleChange('nameEditable', !fields.nameEditable)}
        >
          <Small>{fields.nameEditable ? 'Salvar' : 'Editar'}</Small>
        </EditButton>
      </Input>
      <Input>
        <Wrapper>
          <Field>Sobrenome</Field>
          <TextInput
            defaultValue={user.lastname}
            editable={fields.lastnameEditable}
            onChangeText={text => setFields({
              ...fields,
              lastname: text,
            })
            }
          />
        </Wrapper>
        <EditButton
          hitSlop={{ top: 15, bottom: 15 }}
          onPress={() => handleChange('lastnameEditable', !fields.lastnameEditable)}
        >
          <Small>{fields.lastnameEditable ? 'Salvar' : 'Editar'}</Small>
        </EditButton>
      </Input>
      <Input>
        <Wrapper>
          <Field>E-mail</Field>
          <TextInput editable={false} defaultValue={user.email} />
        </Wrapper>
      </Input>
    </FormContainer>
  );
};
Personal.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};
export default Personal;
