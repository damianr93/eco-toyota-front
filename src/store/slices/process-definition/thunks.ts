import { API } from "../../../api/API";
import { AppThunk } from "../../store";
import {
  createProcessDefinition,
  deleteProcessDefinition,
  setProcessDefinition,
  updateProcessDefinition,
} from "./process-definitions";

export const getProcessDefinitionThunks = (): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API}/process-definitions`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      dispatch(setProcessDefinition(data));
    } catch (error) {
      console.log("Failed to fetch Process Definitions:", error);
    }
  };
};

export const postProcessDefinitionsThunks = (
  area: string,
  name: string,
  type: string,
  description: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API}/process-definitions/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          area,
          name,
          type,
          description,
        }),
      });

      const newProcess = await response.json();

      dispatch(createProcessDefinition(newProcess));
    } catch (error) {
      console.error("Failed to post context analysis:", error);
    }
  };
};

export const patchProcessDefinitionsThunks = (
  id: string,
  area: string,
  name: string,
  type: string,
  description: string
): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API}/process-definitions/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
        body: JSON.stringify({
          area,
          name,
          type,
          description,
        }),
      });

      const newProcessDefinitions = await response.json();
      
      dispatch(updateProcessDefinition(newProcessDefinitions));
    } catch (error) {
      console.error("Failed to post context analysis:", error);
    }
  };
};

export const deleteProcessDefinitionThunks = (id: string): AppThunk => {
  return async (dispatch) => {
    try {
      const response = await fetch(`${API}/process-definitions/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      dispatch(deleteProcessDefinition(id));
    } catch (error) {
      console.error("Failed to post context analysis:", error);
    }
  };
};