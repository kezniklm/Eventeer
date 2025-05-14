import { Button } from "../ui/button";
import { LoadingWheel } from "../ui/loader";

export const SubmitButton = ({ isPending, label = "Submit" }: { isPending: boolean; label?: string }) => (
  <Button className="m-auto" type="submit" disabled={isPending}>
    {isPending ? <LoadingWheel /> : label}
  </Button>
);
