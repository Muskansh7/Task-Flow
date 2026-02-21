import streamlit as st
import streamlit.components.v1 as components

# Set page configuration for a premium feel
st.set_page_config(
    page_title="TaskFlow | Premium Task Management",
    page_icon="🚀",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS to make the iframe fill the screen and remove Streamlit padding
st.markdown("""
    <style>
        .main > div {
            padding: 0;
        }
        iframe {
            border: none;
            width: 100%;
            height: calc(100vh - 50px);
        }
        #MainMenu {visibility: hidden;}
        footer {visibility: hidden;}
        header {visibility: hidden;}
    </style>
""", unsafe_allow_html=True)

# Placeholder URL - This will be updated once Vercel deployment is complete
VERCEL_URL = "https://taskflow-app.vercel.app" # The user will update this or I will if I get the URL

st.title("TaskFlow Dashboard")
st.info("Welcome to the premium TaskFlow interface. Loading your high-performance environment...")

# Embed the Next.js application
components.iframe(VERCEL_URL, height=800, scrolling=True)
