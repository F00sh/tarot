Place your Transformers.js compatible model files here.

Layout example:
public/models/gpt2/
  - model.json                 (references weight shard files by relative path)
  - tokenizer.json             (or tokenizer.model and tokenizer_config.json)
  - config.json
  - generation_config.json     (optional)
  - weights/*                  (e.g., *.bin or *.onnx files referenced by model.json)

Enable local model in .env:
  NUXT_PUBLIC_LOCAL_LLM=1
  NUXT_PUBLIC_LOCAL_MODEL_ROOT=/models
  NUXT_PUBLIC_LOCAL_MODEL_ID=gpt2

Notes:
- The app blocks remote model downloads. All files must exist under public/models/<ID>.
- If you see errors about fetching from huggingface, your local folder is incomplete
  or the model ID/path is wrong. Ensure tokenizer and model files are present.
- For large models, consider a very small / distilled model for demos.

After placing files, restart dev server and choose "AI: Local" in the header.
