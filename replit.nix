
{ pkgs }: {
  deps = [
    pkgs.nodejs_22
    pkgs.nodePackages.typescript-language-server
    pkgs.yarn
  ];
}
