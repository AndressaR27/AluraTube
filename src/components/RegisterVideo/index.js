import React from "react"
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js"

// Custom hook
function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues)
    
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value
            const name = evento.target.name
            setValues({
                ...values,
                [name]: value
            })
        },
        clearForm(){
            setValues({})
        }
    }
};

const PROJECT_URL = "https://ymrgdebodqiodxjzmjls.supabase.co"
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InltcmdkZWJvZHFpb2R4anptamxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNzkyNjAsImV4cCI6MTk4Mzk1NTI2MH0.6Qzunq67sdT19UT0JHsusavk9wUfuhZYwSQKehlzcYE"
const supabase = createClient(PROJECT_URL, PUBLIC_KEY)

//get youtube thumbnail from video url
function getThumbNail(url){
    return `https://image.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`
}

export default function RegisterVideo(){
    const formCadastro = useForm({
        initialValues: { título: "Frost", url:"https://www.youtube.com/watch?v=QsqatJxAUtk"}
    });

    const [formVisivel, setFormVisivel] = React.useState(false);

    return(
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => setFormVisivel(true)}> + </button>
            {formVisivel ? (
                <form 
                    onSubmit={(e)=> 
                    {e.preventDefault();
                    
                    supabase.from("video").insert({
                        title: formCadastro.values.titulo,
                        url: formCadastro.values.url,
                        thumb: getThumbNail(formCadastro.values.url),
                        playlist: "front-end"
                    })
                    .then((response)=> {
                        setFormVisivel(false) 
                        formCadastro.clearForm()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    }}

                >
                <div>
                    <button type="button" className="close-modal"  onClick={() => setFormVisivel(false)}> X </button>
                    <input 
                        name="título" 
                        placeholder="Título do vídeo" 
                        value={formCadastro.values.titulo}
                        onChange={formCadastro.handleChange}
                    />
                    <input 
                        name="url" 
                        placeholder="URL" 
                        value={formCadastro.values.url}
                        onChange={formCadastro.handleChange}
                    />
                    <button type="submit"> Cadastrar </button>
                </div>
            </form>
            ) : (false)}
            

        </StyledRegisterVideo>
    )
}